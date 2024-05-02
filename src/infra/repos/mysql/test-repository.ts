import { TestCategoryEntity, TestEntity } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Test, TestCategory } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class TestRepository extends MySQLRepository implements Test {
  async find({ testId }: Test.FindInput): Promise<Test.FindOutput | Test.FindOutput[]> {
    const testRepo = this.getRepository(TestEntity)
    let tests = undefined
    if(!testId) {
      tests = await testRepo.find({
        relations: {
          category: true,
        }
      })
    } else {
      tests = await testRepo.findOne({
        where: { testId },
        relations: {
          category: true,
        }
      })
    }
    if (tests !== null) return tests
  }

  async save(testData: Test.InsertInput): Promise<Test.InsertOutput> {
    try {
      const testRepo = this.getRepository(TestEntity)
      const test = await testRepo.save(testData)
      if (test !== null) {
        return {
          testId: testData.testId
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  async findOneCategory({ testCategoryId }: TestCategory.FindInput): Promise<TestCategory.FindOutput> {
    const testCategoryRepo = this.getRepository(TestCategoryEntity)
    const category = await testCategoryRepo.findOne({
      where: { testCategoryId }
    })
    if (category !== null) return category
  }

  async findCategory({ testCategoryId }: TestCategory.FindInput): Promise<TestCategory.FindOutput | TestCategory.FindOutput[]> {
    const testCategoryRepo = this.getRepository(TestCategoryEntity)
    let categories = undefined
    if(!testCategoryId) {
      categories = await testCategoryRepo.find({
        relations: {
          tests: true,
        }
      })
    } else {
      categories = await testCategoryRepo.findOne({
        where: { testCategoryId },
        relations: {
          tests: true,
        }
      })
    }
    if (categories !== null) return categories
  }

  

  async saveCategory(testCategoryData: TestCategory.InsertInput): Promise<TestCategory.InsertOutput> {
    try {
      const testRepo = this.getRepository(TestCategoryEntity)
      const test = await testRepo.insert(testCategoryData)
      if (test !== null) {
        return {
          testCategoryId: testCategoryData.testCategoryId
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  testEntity = () => new TestEntity()

  testCategoryEntity = () => new TestCategoryEntity()
}
