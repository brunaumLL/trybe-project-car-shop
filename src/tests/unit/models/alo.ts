import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMoks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();
	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
	});

	after(() => {
		sinon.restore();
	});
    
    describe('Create Car', () => {
		it('Success', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carsFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carsFound).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Read Cars', () => {
		it('Success', async () => {
		  const carFound = await carModel.read();
		  expect(carFound).to.be.deep.equal([carMockWithId]);
		});
	  });
});