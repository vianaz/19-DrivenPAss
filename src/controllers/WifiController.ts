import { Wifi } from "@interfaces/interfaces";
import {
  DeleteWifiServices,
  GetWifiServices,
  InsertWifiServices,
} from "@services/WifiServices";
import { Request, Response } from "express";

export class WifiController {
  insertWifi = async (req: Request<Wifi, Wifi, Wifi>, res: Response) => {
    const insertWifiService = new InsertWifiServices();
    const { user } = req as any;
    const wifiInfo = req.body;

    const { wifiId } = await insertWifiService.insertWifi(user, wifiInfo);

    res.status(201).send({ wifiId });
  };
  getWifi = async (req: Request, res: Response) => {
    const getWifiService = new GetWifiServices();

    const { id } = req.params;
    const { user } = req as any;

    const notes = await getWifiService.getWifi(user.id, id);

    res.send(notes);
  };
  deleteWifi = async (req: Request, res: Response) => {
    const deleteNotesService = new DeleteWifiServices();
    const { id: wifiId } = req.params;

    await deleteNotesService.deleteWifi(wifiId);

    res.send("Wifi deleted");
  };
}
