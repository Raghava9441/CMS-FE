// utils/abortControllerManager.ts
class AbortControllerManager {
    private controllers: Map<string, AbortController> = new Map();

    getSignal(key: string): AbortSignal {
        // Abort previous request with same key
        if (this.controllers.has(key)) {
            this.controllers.get(key)?.abort();
        }

        // Create new controller
        const controller = new AbortController();
        this.controllers.set(key, controller);

        return controller.signal;
    }

    abort(key: string) {
        this.controllers.get(key)?.abort();
        this.controllers.delete(key);
    }

    abortAll() {
        this.controllers.forEach(controller => controller.abort());
        this.controllers.clear();
    }
}

export const abortManager = new AbortControllerManager();