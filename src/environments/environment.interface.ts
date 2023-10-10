export interface Environment {
  production: boolean,
  httpBackend: string,
  language: string,
  apiKey: string,
}

export type Profile = 'dev' | 'local' | 'prod' | 'test';