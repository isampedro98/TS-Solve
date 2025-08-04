import { CaptureVector } from "../types/CaptureVector";
import { Color } from "../types/Colors";
import { MovementVector } from "../types/MovementVector";
import { PieceType } from "../types/PieceType";
import { Position } from "../types/Position";
import { IBoard } from "./IBoard";

export interface IPiece {
  type: PieceType;
  movementVector: MovementVector[];
  captureVector: CaptureVector[];
  isCaptured: boolean;
  color: Color;
  position: Position;
  repeatMove: boolean;

  canMove(target: Position, board: IBoard): boolean;
  getPossibleMoves(board: IBoard): Position[];
}
