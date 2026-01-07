import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Document, AutosaveEntry } from '../../types/document';

interface EditorDB extends DBSchema {
  documents: {
    key: string;
    value: Document;
    indexes: { 
      'by-title': string; 
      'by-createdAt': number;
      'by-updatedAt': number;
    };
  };
  autosave: {
    key: string;
    value: AutosaveEntry;
    indexes: { 'by-timestamp': number };
  };
}

const DB_NAME = 'markdown-latex-editor';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<EditorDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<EditorDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<EditorDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Documents store
      if (!db.objectStoreNames.contains('documents')) {
        const documentStore = db.createObjectStore('documents', {
          keyPath: 'id',
        });
        documentStore.createIndex('by-title', 'title');
        documentStore.createIndex('by-createdAt', 'createdAt');
        documentStore.createIndex('by-updatedAt', 'updatedAt');
      }

      // Autosave store
      if (!db.objectStoreNames.contains('autosave')) {
        const autosaveStore = db.createObjectStore('autosave', {
          keyPath: 'documentId',
        });
        autosaveStore.createIndex('by-timestamp', 'timestamp');
      }
    },
  });

  return dbInstance;
}
