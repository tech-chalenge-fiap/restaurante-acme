import { NoteEntity, PatientEntity } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Patient } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class PatientRepository extends MySQLRepository implements Patient {
  async findOne({ patientId }: Patient.FindInput): Promise<Patient.FindOutput> {
    const patientRepo = this.getRepository(PatientEntity)
    const patient = await patientRepo.findOne({
      where: { patientId },
      relations: {
        notes: true,
      }
    })
    if (patient !== null) return patient
  }

  async insert(patientData: Patient.InsertInput): Promise<Patient.InsertOutput> {
    try {
      const patientRepo = this.getRepository(PatientEntity)
      const patient = await patientRepo.insert(patientData)
      if (patient.raw.insertId) {
        return {
          patientId: patientData.patientId,
          name: patientData.name
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  patientEntity = () => new PatientEntity()

  noteEntity = () => new NoteEntity()
}
