/**
 * ============================================================================
 * @module      IocActivityModel
 * @description Modelo de Dominio Orientado a Objetos (OOP) para las actividades
 *              oficiales (EAC / EAF / Quizzes) de las materias de IOC.
 * ============================================================================
 */

export class IocActivity {
  constructor({
    id,
    title,
    status = 'pending',
    dueDate = '',
    theorySlug = '',
    nota = null,
    description = '',
    weight = '',
    checklist = [],
    resolvedExampleSlug = '',
    resolvedExampleTitle = '',
    resolvedTopicSlug = ''
  }) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.dueDate = dueDate;
    this.theorySlug = theorySlug;
    this.nota = nota;
    this.description = description;
    this.weight = weight;
    this.checklist = checklist;
    this.resolvedExampleSlug = resolvedExampleSlug;
    this.resolvedExampleTitle = resolvedExampleTitle;
    this.resolvedTopicSlug = resolvedTopicSlug;
  }

  /**
   * Formato legible de fecha en español (ej: "2026-10-22" -> "22 Octubre 2026")
   */
  get formattedDueDate() {
    if (!this.dueDate) return 'Fecha por determinar';
    try {
      const parts = this.dueDate.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const monthName = months[monthNum - 1] || parts[1];
        return `${day} ${monthName} ${year}`;
      }
    } catch {
      // fallback
    }
    return this.dueDate;
  }

  /**
   * Identificador simplificado (ej: "eac1" -> "EAC 1", "eac1_p1" -> "QUIZ P1", "eaf1" -> "EAF 1")
   */
  get shortBadge() {
    if (!this.id) return 'EAC';
    if (this.id.includes('p1')) return 'PARTE 1';
    if (this.id.includes('p2')) return 'PARTE 2';
    if (this.id.startsWith('eaf')) return this.id.toUpperCase().replace('EAF', 'EAF ');
    return this.id.toUpperCase().replace('EAC', 'EAC ');
  }

  isPending() {
    return this.status === 'pending';
  }

  isLocked() {
    return this.status === 'locked';
  }

  isCompleted() {
    return this.status === 'completed' || this.nota !== null;
  }

  hasTheorySlug() {
    return Boolean(this.theorySlug && this.theorySlug.trim() !== '');
  }
}

export class IocActivitiesRepository {
  constructor(rawActivities = []) {
    this.activities = rawActivities.map(raw => new IocActivity(raw));
  }

  getAll() {
    return this.activities;
  }

  findById(id) {
    return this.activities.find(act => act.id === id) || null;
  }

  findByTheorySlug(slug) {
    return this.activities.find(act => act.theorySlug === slug) || null;
  }
}
