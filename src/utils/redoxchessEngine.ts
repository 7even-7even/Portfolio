class RedoxChessEngine {
  private engine: Worker | null = null;
  private onMoveCallback: ((move: string) => void) | null = null;
  private readyTimer: number | null = null;
  private rejectInitialization: ((reason?: unknown) => void) | null = null;
  private _isReady = false;

  get isReady() {
    return this._isReady;
  }

  init(timeoutMilliseconds = 10_000) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.engine = new Worker("/redoxchess.js");
      } catch (error) {
        reject(error);
        return;
      }

      this.rejectInitialization = reject;
      this.readyTimer = window.setTimeout(() => {
        this.rejectInitialization = null;
        this.quit();
        reject(new Error("The chess engine did not initialize in time"));
      }, timeoutMilliseconds);

      this.engine.onerror = (event) => {
        this.clearReadyTimer();
        this.rejectInitialization = null;
        reject(new Error(event.message || "The chess engine failed to load"));
      };

      this.engine.onmessage = (event: MessageEvent<unknown>) => {
        if (typeof event.data !== "string") return;
        const message = event.data;

        if (message === "readyok") {
          this._isReady = true;
          this.clearReadyTimer();
          this.rejectInitialization = null;
          resolve();
          return;
        }

        if (message.startsWith("bestmove")) {
          const move = message.split(" ")[1];
          const callback = this.onMoveCallback;
          this.onMoveCallback = null;
          if (move && move !== "(none)") callback?.(move);
        }
      };

      this.send("uci");
      this.send("isready");
    });
  }

  private clearReadyTimer() {
    if (this.readyTimer !== null) {
      window.clearTimeout(this.readyTimer);
      this.readyTimer = null;
    }
  }

  private send(command: string) {
    this.engine?.postMessage(command);
  }

  setPosition(fen: string) {
    if (!this._isReady) return;
    this.send(`position fen ${fen}`);
  }

  getBestMove(onMove: (move: string) => void, depth = 15) {
    if (!this._isReady) return false;
    this.onMoveCallback = onMove;
    this.send(`go depth ${depth}`);
    return true;
  }

  stop() {
    this.onMoveCallback = null;
    this.send("stop");
  }

  quit() {
    this.clearReadyTimer();
    this.onMoveCallback = null;
    this._isReady = false;
    const reject = this.rejectInitialization;
    this.rejectInitialization = null;
    reject?.(new Error("Chess engine initialization was cancelled"));

    if (this.engine) {
      this.engine.postMessage("quit");
      this.engine.terminate();
      this.engine = null;
    }
  }
}

export default RedoxChessEngine;
