import axios from 'axios';
import { merge } from 'lodash';

import { delayedValue } from '../utils/randoms';
import { normalizeEntities, NormalizedEntities } from '../utils/normalize-entities';

const defaultDelaysMap = {
  create: 1800,
  read: 1800,
  update: 2400,
  delete: 2400,
};

const defaultNormilizeOptions = {
  normalize: false,
  entityKey: null,
};

const port = 4100;
const baseUrl = `http://localhost:${port}`;

export interface DataEntity {
  id: number;
}

type DataEntityParams = Partial<DataEntity>;

export type EntitiesAll<T> = T[] | NormalizedEntities<T>;

export default class DataApiService<T extends DataEntity> {
  private _url: string;
  private _delays: any;
  private _normalizeOptions: any;

  constructor(url: string, normalizeOptions = {}, delays = {}) {
    this._url = url;
    this._delays = merge({}, defaultDelaysMap, delays);
    this._normalizeOptions = merge({}, defaultNormilizeOptions, normalizeOptions);
  }

  find(id: number) {
    return axios.get(this._getSingleUrl({ id }))
      .then((response) => response.data)
      .then(this._singularNormalizeIf)
      .then((result) => delayedValue(result, this._delays.read));
  }

  update(entity: T, params = {}) {
    return axios.put(this._getSingleUrl(entity), params)
      .then((response) => response.data)
      .then(this._singularNormalizeIf)
      .then((updatedEntity) => delayedValue(updatedEntity, this._delays.update));
  }

  remove(entity: T) {
    const removedId = entity.id;
    return axios.delete(this._getSingleUrl(entity))
      .then(() => delayedValue(removedId, this._delays.delete));
  }

  create(entityData: DataEntityParams) {
    return axios.post(this._getUrl(), entityData)
      .then((response) => response.data)
      .then(this._singularNormalizeIf)
      .then((createdEntity) => delayedValue(createdEntity, this._delays.create));

  }

  getAll(): Promise<EntitiesAll<T>> {
    return axios.get<T[]>(this._getUrl())
      .then((response) => response.data as T[])
      .then(this._pluralNormalizeIf)
      .then((entities: EntitiesAll<T>) => delayedValue(entities, this._delays.read));
  }

  _getUrl(): string {
    return `${baseUrl}${this._url}`;
  }

  _getSingleUrl(entity: DataEntity) {
    return `${this._getUrl()}/${entity.id}`;
  }

  _singularNormalizeIf = (entity: DataEntity) => {
    const { normalize, entityKey } = this._normalizeOptions;
    if (normalize) {
      return normalizeEntities([entity], entityKey);
    } else {
      return entity;
    }
  };

  _pluralNormalizeIf = (entities: T[]): EntitiesAll<T> => {
    const { normalize, entityKey } = this._normalizeOptions;
    if (normalize) {
      return normalizeEntities(entities, entityKey);
    } else {
      return entities;
    }
  };

}
