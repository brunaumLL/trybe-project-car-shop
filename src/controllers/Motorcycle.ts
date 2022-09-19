import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const data = req.body;
    const motorcycle = data;
    const results = await this._service.create(motorcycle);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const data = req.body;
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IMotorcycle>) {
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}
