import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMoks';

describe('Motorcycle Service', () => {
	const motorcycleModel = new MotorcycleModel();
	const motorcycleService = new MotorcycleService(motorcycleModel);

	before(() => {
		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
		sinon.stub(motorcycleModel, 'readOne')
			.onCall(0).resolves(motorcycleMockWithId) 
			.onCall(1).resolves(null);
        sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
        sinon.stub(motorcycleModel, 'update')
			.onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null);
        sinon.stub(motorcycleModel, 'delete')
    	.onCall(0).resolves(motorcycleMockWithId)
    	.onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore()
	});

	describe('Create Motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
            let error;
			try {
				await motorcycleService.create({});
			} catch (err) {
                error = err
			}
                expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne Motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.readOne(motorcycleMockWithId._id);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
            let error;
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (err:any) {
                error = err
			}
                expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

    describe('Read Motorcycles', () => {
        it('Success', async () => {
          const motorcycles = await motorcycleService.read();
          expect(motorcycles).to.be.deep.equal([motorcycleMockWithId]);
        });
    });

    describe('Update Motorcycle', () => {
		it('Success', async () => {
			const updated = await motorcycleService.update('any-id', motorcycleMock);
			expect(updated).to.be.deep.eq(motorcycleMockWithId)
		});

		it('Failure - Not Found', async () => {
			let err: any;
			try {
				await motorcycleService.update('any-id', motorcycleMock);
			} catch(error) {
				err = error;
			}
			expect(err.message).to.be.eq(ErrorTypes.EntityNotFound);
		});

		it('Failure - Zod Fails', async () => {
			let err: any;
			try {
				await motorcycleService.update('any-id', {});
			} catch(error) {
				err = error;
			}
			expect(err).to.be.instanceOf(ZodError);
		});
	});

    describe('Delete Motorcycle', () => {
		it('Success', async () => {
			const motorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
			expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
            let error;
			try {
				await motorcycleService.delete(motorcycleMockWithId._id);
			} catch (err: any) {
                error = err
			}
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
});