import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockForChange, motorcycleMockForChangeWithId, motorcycleMockWithId } from '../../mocks/motorcycleMoks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();
	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockForChangeWithId);
		sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockForChangeWithId);
	});

	after(() => {
		sinon.restore();
	});
    
    describe('Create Motorcycle', () => {
		it('Success', async () => {
			const newMotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	});

	describe('ReadOne Motorcycle', () => {
		it('Success', async () => {
			const motorcyclesFound = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

	describe('Read Motorcycles', () => {
		it('Success', async () => {
		  const motorcycleFound = await motorcycleModel.read();
		  expect(motorcycleFound).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

	describe('Update Motorcycle', () => {
		it('Success', async () => {
			const motorcycleChanged = await motorcycleModel.update('4edd40c86762e0fb12000003', motorcycleMockForChange);
			expect(motorcycleChanged).to.be.deep.equal(motorcycleMockForChangeWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

	describe('Delete Motorcycle', () => {
		it('Success', async () => {
		  const motorcycleDeleted = await motorcycleModel.delete('4edd40c86762e0fb12000003');
		  expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockForChangeWithId);
		});
	  
		it('Failure', async () => {
		  try {
			await motorcycleModel.delete('123ERRADO');
		  } catch (error: any) {
			expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
		  }
		});
	  });
});