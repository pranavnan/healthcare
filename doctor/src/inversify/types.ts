export const TYPES = {
  // Doctor TYPES
  DoctorService: Symbol.for('DoctorService'),
  DoctorController: Symbol.for('DoctorController'),
  DoctorRepository: Symbol.for('DoctorRepository'),
  DataSource: Symbol.for('DataSource'),
  TypeORMDoctorRepository: Symbol.for('TypeORMDoctorRepository'),

  // Speciality TYPES
  TypeORMSpeciality: Symbol.for('TypeORMSpeciality'),
  SpecialityRepository: Symbol.for('SpecialityRepository'),

  // doc-loc TYPES
  DocLocService: Symbol.for('DocLocService'),
  TypeORMDocLocRepository: Symbol.for('TypeORMDocLocRepository'),

  // location TYPES
  LocationService: Symbol.for('LocationService'),
  TypeORMLocationRepository: Symbol.for('TypeORMLocationRepository'),

  // slots TYPES
  SlotService: Symbol.for('SlotService'),
  TypeORMSlotRepository: Symbol.for('TypeORMSlotRepository'),
};
