import type { PersonalName } from './PersonalName.js';
import type { Gender } from './Gender.js';

/** @description Object containing personal information like name, date of birth and gender. */
export interface PersonalInformation {
  /**
   * @description The date of birth of the customer of the recipient of the loan.
   *     Format YYYYMMDD
   */
  dateOfBirth?: string;
  gender?: Gender;
  name?: PersonalName;
}
