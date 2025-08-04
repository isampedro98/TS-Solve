import { IBoard } from "../interfaces/IBoard";
import { IPiece } from "../interfaces/IPiece";
import { CaptureVector } from "../types/CaptureVector";
import { Color } from "../types/Colors";
import { MovementVector } from "../types/MovementVector";
import { PieceType } from "../types/PieceType";
import { Position } from "../types/Position";

export abstract class AbstractPiece implements IPiece {
    type: PieceType;
    movementVector: MovementVector[];
    captureVector: CaptureVector[];
    isCaptured: boolean;
    color: Color;
    position: Position;
    repeatMove: boolean;

    constructor(type: PieceType, color: Color, position: Position) {
        this.type = type;
        this.color = color;
        this.position = position;
        this.isCaptured = false;
        this.movementVector = []; // Default value is null, should be overridden
        this.captureVector = []; // Default value is null, should be overridden
        this.repeatMove = false;
    }

    abstract canMove(target: Position): boolean;

    abstract getPossibleMoves(board: IBoard): Position[];
}