import { ICar } from '../../interfaces/ICar';

export const carMock:ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

export const carMockWithId:ICar & { _id:string } = {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

export const carMockForChange:ICar = {
	model: "Ferrari Goiabada",
    year: 1964,
    color: "purple",
    buyValue: 3100000,
    seatsQty: 4,
    doorsQty: 4
};

export const carMockForChangeWithId:ICar & { _id:string } = {
	_id: "4edd40c86762e0fb12000003",
    model: "Ferrari Goiabada",
    year: 1964,
    color: "purple",
    buyValue: 3100000,
    seatsQty: 4,
    doorsQty: 4
};