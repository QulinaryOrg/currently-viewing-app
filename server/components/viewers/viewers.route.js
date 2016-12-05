import * as express from "express";
import {getViewers, saveViewer, viewerWentOffline} from './viewers.controller';
export const router = express.Router();
/**
 * Get Connected Users
 * Examples:
 *     curl -v -X GET http://localhost:3000/viewers?connected=true
 */
router.route('/viewers').get(getViewers);

/**
 * Add Connected Users
 * Example:
 *   curl -v -X POST -H "Content-Type:application/json" -d
 *   '{ ip: String }' http://localhost:3000/viewers
 */
router.route('/viewers').post(saveViewer);

/**
 * DELETE Connected Users
 * Example:
 *   curl -X DELETE -G ' http://localhost:3000/viewers' -d 'id=3'
 */
router.route('/viewers').delete(viewerWentOffline);
