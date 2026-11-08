/**
 * ============================================================================
 * @module      EacKitModel
 * @description Modelo de Dominio Orientado a Objetos (OOP) para kits de desarrollo EAC.
 *              Encapsula los datos de configuración y la lógica de negocio de cada hito.
 * ============================================================================
 */

export class EacDevKit {
  constructor({
    eacId,
    moduleId,
    unitTitle,
    eacTitle,
    dueDate,
    badge,
    color = '#3b82f6',
    summary = '',
    startSlug = '',
    installCommands = [],
    shortcuts = [],
    tips = [],
    checklist = []
  }) {
    this.eacId = eacId;
    this.moduleId = moduleId;
    this.unitTitle = unitTitle;
    this.eacTitle = eacTitle;
    this.dueDate = dueDate;
    this.badge = badge;
    this.color = color;
    this.summary = summary;
    this.startSlug = startSlug;
    this.installCommands = installCommands;
    this.shortcuts = shortcuts;
    this.tips = tips;
    this.checklist = checklist;
  }

  /**
   * Identificador formal en mayúsculas (ej: "EAC1")
   */
  get label() {
    return (this.eacId || '').toUpperCase();
  }

  /**
   * Devuelve si el kit cuenta con comandos de instalación configurados
   */
  hasInstallCommands() {
    return Array.isArray(this.installCommands) && this.installCommands.length > 0;
  }

  /**
   * Devuelve si el kit tiene atajos de Eclipse
   */
  hasShortcuts() {
    return Array.isArray(this.shortcuts) && this.shortcuts.length > 0;
  }

  /**
   * Devuelve si el kit tiene tips de entrega
   */
  hasTips() {
    return Array.isArray(this.tips) && this.tips.length > 0;
  }
}

/**
 * Repositorio / Catálogo de kits de desarrollo (Patrón Repository)
 */
export class EacKitRepository {
  constructor(rawData = {}) {
    this._kits = new Map();
    Object.entries(rawData).forEach(([key, val]) => {
      this._kits.set(key, new EacDevKit(val));
    });
  }

  /**
   * Obtiene un kit por su identificador de unidad ('u1', 'u2', 'u3')
   */
  findByModuleId(moduleId) {
    if (!moduleId) return this._kits.get('u1');
    return this._kits.get(moduleId) || this._kits.get('u1');
  }

  /**
   * Lista todos los identificadores de unidad disponibles
   */
  getModuleIds() {
    return Array.from(this._kits.keys());
  }

  /**
   * Obtiene la colección completa de kits
   */
  getAll() {
    return Array.from(this._kits.values());
  }
}
