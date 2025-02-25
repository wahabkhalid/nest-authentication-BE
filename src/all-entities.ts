import { Category } from './category/entities/category.entity';
import { Clinician } from './clinician_profile/entities/clinician-profile.entity';
import { Miniature } from './miniatures/entities/miniature.entity';
import { ClinicianPatient } from './patient/entities/clinician-patient.entity';
import { Patient } from './patient/entities/patient.entity';
import { PatientTray } from './patient_tray/entities/create-tray.entity';
import { TrayMiniatures } from './patient_tray/entities/tray-miniatures.entity';
import { TrayViewHistory } from './patient_tray/entities/tray-view-history.entity';
import { Session } from './session/entities/create-session.entity';
import { UserRole } from './user_role/entities/user-role.entity';
import { User } from './users/entities/users.entity';

const AllEntities = [
  User,
  Clinician,
  UserRole,
  Category,
  Miniature,
  Patient,
  ClinicianPatient,
  Session,
  PatientTray,
  TrayMiniatures,
  TrayViewHistory,
];
export { AllEntities };
