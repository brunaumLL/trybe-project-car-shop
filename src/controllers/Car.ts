import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const data = req.body;
    const car = data;
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const data = req.body;
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<ICar>) {
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}
