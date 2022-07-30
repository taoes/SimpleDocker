
export class FifoCache<K, V>{

    private limit: number = 10
    private keys: Array<K> = []
    private values: Array<V> = []
    private full: boolean = false

    constructor(limit: number) {
        this.limit = limit
    }

    set(key: K, value: V) {
        console.log(`k=${key},v=${value}`)
        if (!this.full) {
            this.keys.push(key)
            this.values.push(value)
            if (this.limit === this.keys.length) {
                this.full = true
            } else {
                this.full = false
            }
            return
        }


        for (let i = 1; i < this.limit; i++) {
            this.keys[i - 1] = this.keys[i]
            this.values[i - 1] = this.values[i]
        }

        this.keys[this.limit - 1] = key
        this.values[this.limit - 1] = value
    }

    getKeys(): Array<K> {
        return this.keys
    }

    getValues(): Array<V> {
        return this.values
    }
}

