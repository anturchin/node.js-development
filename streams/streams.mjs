import fs from 'node:fs'
import { Transform, pipeline } from 'node:stream'
import { EOL } from 'node:os'

const inputFilePath = process.argv[2]
const outputFilePath = './output.txt'

class SplitWords extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
    }

    _transform(chunk, encoding, cb) {
        const words = chunk.split(/\s+/)
        words.forEach(word => this.push(word))
        cb()
    }
}

class FilterWords extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
    }

    _transform(word, encoding, cb) {
        const filteredWord = word.replace(/[^a-zA-Zа-яА-Я]/g, '')
        if (filteredWord) {
            this.push(filteredWord)
        }
        cb()
    }
}

class IndexWords extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
        this.wordCounts = {}
    }

    _transform(word, encoding, cb) {
        if (this.wordCounts[word]) {
            this.wordCounts[word]++
        } else {
            this.wordCounts[word] = 1
        }
        cb()
    }

    _flush(cb) {
        const sortedWords = Object.keys(this.wordCounts).sort()
        const vector = sortedWords.map(word => this.wordCounts[word])
        this.push(vector.join(' ') + EOL)
        cb()
    }
}

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' })

const splitWords = new SplitWords()
const filterWords = new FilterWords()
const indexWords = new IndexWords()

const writeStream = fs.createWriteStream(outputFilePath)

pipeline(
    readStream,
    splitWords,
    filterWords,
    indexWords,
    writeStream,
    (err) => {
        if (err) {
            console.log(`pipeline failed: ${err.message}`)
        } else {
            console.log(`pipeline success`)
        }
    }
)

