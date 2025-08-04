import { IBoard } from "../interfaces/IBoard";
import { IPiece } from "../interfaces/IPiece";
import { Color } from "../types/Colors";
import { Position } from "../types/Position";

export class Board implements IBoard {
    board: (IPiece | null)[][];
    private pieces: IPiece[];

    constructor(pieces?: IPiece[]) {
        this.board = Array.from({ length: 8 }, () => Array<IPiece | null>(8).fill(null));
        this.pieces = [];

        if (pieces) {
            for (const piece of pieces) {
                const [x, y] = piece.position;
                if (this.isInsideBoard(piece.position)) {
                    this.board[x][y] = piece;
                }
                this.pieces.push(piece);
            }
        }
    }

    getTeamPieces(color: Color): IPiece[] {
        return this.pieces.filter(piece => piece?.color === color && !piece.isCaptured);
    }

    getCapturedTeamPieces(color: Color): IPiece[] {
        return this.pieces.filter(piece => piece?.color === color && piece.isCaptured);
    }

    getPieceAt(position: Position): IPiece | null {
        if (!this.isInsideBoard(position)) return null;
        const [x, y] = position;
        return this.board[x][y];
    }
    movePiece(piece: IPiece, targetPosition: Position): boolean {
        const [fromX, fromY] = piece.position;
        if (!piece.canMove(targetPosition, this)) return false;
        const [toX, toY] = targetPosition;

        const targetPiece = this.getPieceAt(targetPosition);

        // Validar si se puede mover (ya lo podés dejar afuera si se validó antes)
        if (targetPiece && targetPiece.color === piece.color) return false;

        // Eliminar del lugar actual
        this.board[fromX][fromY] = null;

        // Captura si había pieza
        if (targetPiece && targetPiece.color !== piece.color) {
            targetPiece.isCaptured = true; // Marcar como capturada

        }

        // Actualizar pieza y colocarla en la nueva posición
        piece.position = targetPosition;
        this.board[toX][toY] = piece;

        return true;
    }

    remainingPieces(color: Color): IPiece[] {
        return this.getTeamPieces(color).filter(piece => !piece.isCaptured);
    }

    isPathClear(from: Position, to: Position): boolean {
        const [x1, y1] = from;
        const [x2, y2] = to;

        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);

        let x = x1 + dx;
        let y = y1 + dy;

        while (x !== x2 || y !== y2) {
            if (!this.isInsideBoard([x, y])) return false;
            if (this.getPieceAt([x, y])) return false;
            x += dx;
            y += dy;
        }

        return true;
    }

    isEmpty(position: Position): boolean {
        return this.getPieceAt(position) === null;
    }

    isInsideBoard(position: Position): boolean {
        const [x, y] = position;
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    getAllPieces(): IPiece[] {
        return this.pieces;
    }
}