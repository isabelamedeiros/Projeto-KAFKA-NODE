//Receber mensagens do Kafka

import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'certificate',
})

const topic = 'issue-certificate'
const consumer = kafka.consumer({ groupId: 'certificate-group' })
async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({ 
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`-${prefix} ${message.key}#${message.value}`)
        }
    })
}

run().catch(console.error)