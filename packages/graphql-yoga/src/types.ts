import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { MaskError, PromiseOrValue } from '@envelop/core'
import type { createFetch } from '@whatwg-node/fetch'
import type { GraphQLSchema } from 'graphql'

export type GraphQLSchemaWithContext<TContext> = GraphQLSchema & {
  _context?: TContext
}

export interface GraphQLParams<
  TVariables = Record<string, any>,
  TExtensions = Record<string, any>,
> {
  operationName?: string
  query?: string
  variables?: TVariables
  extensions?: TExtensions
}

export interface YogaInitialContext {
  /**
   * GraphQL Parameters
   */
  params: GraphQLParams
  /**
   * An object describing the HTTP request.
   */
  request: Request
}

export type CORSOptions =
  | {
      origin?: string[] | string
      methods?: string[]
      allowedHeaders?: string[]
      exposedHeaders?: string[]
      credentials?: boolean
      maxAge?: number
    }
  | false

export type GraphQLServerInject<
  TData = any,
  TVariables = Record<string, any>,
  TServerContext extends Record<string, any> = Record<string, any>,
> = {
  /** GraphQL Operation to execute */
  document: string | TypedDocumentNode<TData, TVariables>
  /** Variables for GraphQL Operation */
  variables?: TVariables
  /** Name for GraphQL Operation */
  operationName?: string
  /** Set any headers for the GraphQL request */
  headers?: HeadersInit
  // eslint-disable-next-line @typescript-eslint/ban-types
} & ({} extends TServerContext
  ? { serverContext?: TServerContext }
  : { serverContext: TServerContext })

declare global {
  interface ReadableStream<R = any> {
    [Symbol.asyncIterator]: () => AsyncIterator<R>
  }
}

export type FetchAPI = ReturnType<typeof createFetch>

export interface FetchEvent extends Event {
  request: Request
  respondWith(response: PromiseOrValue<Response>): void
}

export type YogaMaskedErrorOpts = {
  maskError: MaskError
  errorMessage: string
  isDev?: boolean
}

export type MaybeArray<T> = T | T[]
