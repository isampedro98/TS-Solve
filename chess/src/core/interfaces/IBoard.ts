import { Color } from "../types/Colors";
import { Position } from "../types/Position";
import { IPiece } from "./IPiece";

export interface IBoard {
    board: (IPiece | null)[][]

    getTeamPieces(color: Color): IPiece[];
    getPieceAt(position: Position): IPiece | null;
    movePiece(piece: IPiece, targetPosition: Position): boolean;
    remainingPieces(color: Color): IPiece[];
}