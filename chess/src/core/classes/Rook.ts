// pieces/Rook.ts
// Torre en español
import { AbstractPiece } from "../abstract/AbstractPiece";
import { IBoard } from "../interfaces/IBoard";
import { Color } from "../types/Colors";
import { PieceType, PieceTypes } from "../types/PieceType";
import { Position } from "../types/Position";

export class Rook extends AbstractPiece {
    constructor(color: Color, position: Position) {
        super(PieceTypes.rook as PieceType, color, position);
        this.movementVector = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Rook can move horizontally or vertically
        this.captureVector = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Same for capturing
        this.repeatMove = true; // Rooks can move multiple squares in one direction
    }

    canMove(target: [number, number]): boolean {
        const [x, y] = this.position;
        const [tx, ty] = target;
        return (x === tx || y === ty); // lógica simplificada
    }

    getPossibleMoves(board: IBoard): [number, number][] {
        // Implementación completa para todas las casillas válidas
        return [];
    }
}