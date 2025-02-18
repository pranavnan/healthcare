export const TYPES = {
  // Index TYPES
  IndexRepository: Symbol.for('IndexRepository'),
  IndexService: Symbol.for('IndexService'),
  TypeORMIndexRepository: Symbol.for('TypeORMIndexRepository'),
  TypeORMIndexTypeRepository: Symbol.for('TypeORMIndexTypeRepository'),
  IndexTypeRepository: Symbol.for('IndexTypeRepository'),

  // Index Document TYPES
  IndexDocumentRepository: Symbol.for('IndexDocumentRepository'),
  IndexDocumentService: Symbol.for('IndexDocumentService'),
  TypeORMIndexDocumentRepository: Symbol.for('TypeORMIndexDocumentRepository'),

  // Index Document Type TYPES
  IndexDocumentTypeRepository: Symbol.for('IndexDocumentTypeRepository'),
  TypeORMIndexDocumentTypeRepository: Symbol.for(
    'TypeORMIndexDocumentTypeRepository'
  ),
};
