
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka1:9092', 'kafka2:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })
const topic = 'Operational'
// Consuming        
const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}
run().catch(console.error)