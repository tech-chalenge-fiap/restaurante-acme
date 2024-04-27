import { TestRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Test,TestCategory } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { Validator } from '@/application/validation'
import { EntityError } from '@/infra/errors'

export class TestController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    readonly testRepo: TestRepository
  ) { }

  async handleGetTest(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getTest(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreateTest(httpRequest: Test.InsertInput): Promise<HttpResponse> {
    const testEntity = Object.assign(this.testRepo.testEntity(), httpRequest);
    const errors = await this.validator.validate(testEntity)
    if (httpRequest.category) {
      const categoryData = await this.testRepo.findOneCategory({ testCategoryId: httpRequest.category })
      if(!categoryData) return badRequest(new Error('Cant insert test: category not found'))
      const category = this.testRepo.testCategoryEntity()
      testEntity.category = Object.assign(category, categoryData);
    }
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))
    try {
      return await this.createTest(testEntity)
    } catch (error) {
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getTest({ testId }: Test.FindInput): Promise<HttpResponse<Test.FindOutput | Test.FindOutput[] | Error>> {
    const tests = await this.testRepo.find({ testId })
    if (tests === undefined) return notFound()
    return ok(tests)
  }

  async createTest(testData: Test.InsertInput): Promise<HttpResponse<Test.InsertOutput | Error>> {
    testData.testId = this.tokenHandler.generateUuid()
    const test = await this.testRepo.save(testData)
    if (test === undefined) return badRequest(new Error('Cant insert test'))
    return ok({ testId: test.testId, name: testData.name })
  }

  async handleGetTestCategory(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getTestCategory(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreateTestCategory(httpRequest: TestCategory.InsertInput): Promise<HttpResponse> {
    const testCategoryEntity = Object.assign(this.testRepo.testCategoryEntity(), httpRequest);
    const errors = await this.validator.validate(testCategoryEntity)
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))
    try {
      return await this.createTestCategory(testCategoryEntity)
    } catch (error) {
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getTestCategory({ testCategoryId }: TestCategory.FindInput): Promise<HttpResponse<TestCategory.FindOutput | TestCategory.FindOutput[] | Error>> {
    const tests = await this.testRepo.findCategory({ testCategoryId })
    if (tests === undefined) return notFound()
    return ok(tests)
  }

  async createTestCategory(testCategoryData: TestCategory.InsertInput): Promise<HttpResponse<TestCategory.InsertOutput | Error>> {
    testCategoryData.testCategoryId = this.tokenHandler.generateUuid()
    const test = await this.testRepo.saveCategory(testCategoryData)
    if (test === undefined) return badRequest(new Error('Cant insert test category'))
    return ok({ testCategoryId: test.testCategoryId, name: testCategoryData.name })
  }

}
