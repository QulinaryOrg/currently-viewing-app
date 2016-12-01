import {ViewersService, debug} from "./viewers.service";
import * as requestIp from "request-ip";
const viewersService = new ViewersService();
import {io} from "../../app";

/**
 * @method getViewers
 * Get List of Viewer Data
 * @param req
 * @param res
 * @param next
 */
export const getViewers = (req, res, next) =>
  viewersService.getViewers()
    .then(viewer => res.send(viewer))
    .catch(e => res.status(500).send(e));

/**
 * @method saveViewer
 * Save Viewer Data
 * @param req
 * @param res
 * @param next
 */
export const saveViewer = (req, res, next) => {
  console.log('ADD...', requestIp.getClientIp(req));
  return viewersService.addViewer(requestIp.getClientIp(req))
    .then(viewer => {
      io.emit('VIEWERS_UPDATE');
      console.log(viewer[0]);
      res.send(viewer[0]);
    })
    .catch(e => {
      console.error(e);
      res.status(500).send(e)
    });
}

/**
 * @method viewerWentOffline
 * Save Viewer Data
 * @param req
 * @param res
 * @param next
 */
export const viewerWentOffline = (req, res, next) => {
  console.log('DISCONNECTED .....')
  return viewersService.getViewers({ip: requestIp.getClientIp(req)})
    .tap(v => console.log('DISCONNECT ......', v))
    .then(viewersService.setViewerToOffline)
    .then(viewer => {
      io.emit('VIEWERS_UPDATE');
      res.send(viewer);
    })
    .catch(e => res.status(500).send(e));
}
