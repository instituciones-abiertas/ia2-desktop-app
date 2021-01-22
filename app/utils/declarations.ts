export interface IDoc {
  subject: string;
  type: string;
  fileName: string;
}

export interface IAnnotation {
  start: number;
  end: number;
  tag: string;
}

export interface IDocAnalysis {
  id: number;
  text: string;
  ents: IAnnotation[];
}

export interface ISubject {
  id: number;
  name: string;
}

export interface IEntity {
  id: number;
  name: string;
  description: string;
  should_anonymization: boolean;
}
