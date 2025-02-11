import { RawAxiosRequestHeaders } from 'axios';
/**
 * Represents the version of the API.
 * The version should follow the format `v<number>`, e.g., `v1`, `v2`.
 */
export type Version = `v${number}`;

/**
 * Represents the structure of custom HTTP headers.
 * It extends the RawAxiosRequestHeaders type from Axios.
 */
export type HeaderOptions = RawAxiosRequestHeaders;

/**
 * Defines the type of authorization token to be used.
 * - `Bearer`: Standard Bearer token.
 * - `OAuth`: OAuth token.
 */
export type TokenType = 'Bearer' | 'OAuth';

export type PhoneNumberId = string | number;

export type LanguageCode =
  | 'en'
  | 'en_US'
  | 'en_GB'
  | 'es'
  | 'es_MX'
  | 'es_AR'
  | 'fr'
  | 'fr_FR'
  | 'de'
  | 'pt_BR'
  | 'pt_PT'
  | 'hi'
  | 'ar'
  | 'zh_CN'
  | 'zh_TW';
