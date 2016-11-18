var bitwriter = {};
module.exports = bitwriter;
bitwriter.writeBool = function (buffer, value, position) {
    var bitToWrite = position % 8;
    var byteToWrite = Math.floor(position / 8);
    if (value) {
        buffer[byteToWrite] |= (1 << bitToWrite);
    } else {
        buffer[byteToWrite] &= ~(1 << bitToWrite);
    }
    return 1;
};
bitwriter.writeUint = function (buffer, value, size, position) {
    var bitsWritten = 0;
    var bitsLeftToWrite = size;
    while (bitsLeftToWrite) {
        // Determine where to write, and how many bits to write
        var bitToWrite = position % 8;
        var byteToWrite = Math.floor(position / 8);
        var bitsToWrite = Math.min(bitsLeftToWrite, 8 - bitToWrite);
        // Write out the bits
        buffer[byteToWrite] |= (value & ((1 << bitsToWrite) - 1)) << bitToWrite;
        // Shift value for next loop
        value = value >> bitsToWrite;
        // Update counters
        position += bitsToWrite;
        bitsWritten += bitsToWrite;
        bitsLeftToWrite -= bitsToWrite;
    }
    return bitsWritten;
};
bitwriter.writeInt = function (buffer, value, size, position) {
    return bitwriter.writeUint(buffer, value, size, position);
};
bitwriter.writeFloat = function (buffer, value, size, position) {
    if (size === 32) {
        var buf = Buffer.alloc(4);
        buf.writeFloatLE(value, 0);
        bitwriter.writeUint(buffer, buf[0], 8, position);
        bitwriter.writeUint(buffer, buf[1], 8, position + 8);
        bitwriter.writeUint(buffer, buf[2], 8, position + 16);
        bitwriter.writeUint(buffer, buf[3], 8, position + 24);
        return 32;
    } else {
        return size; // TODO: Implement
    }
};
bitwriter.writeString = function (buffer, value, size, position) {
    var bitsWritten = 0;
    for (var i = 0; i < size; i++) {
        var c = i < value.length ? value.charCodeAt(i) : 0;
        bitsWritten += bitwriter.writeUint(buffer, c, 8, position + 8 * (size - i - 1));
    }
    return bitsWritten;
};
bitwriter.readBool = function (buffer, position) {
    var bitToRead = position % 8;
    var byteToRead = Math.floor(position / 8);
    return {
        value: (buffer[byteToRead] >> bitToRead) & 1,
        bitsRead: 1
    };
};
bitwriter.readUint = function (buffer, size, position) {
    var bitsLeftToRead = size;
    var result = {value: 0, bitsRead: 0};
    while (bitsLeftToRead) {
        // Determine where to read, and how many bits to read
        var bitToRead = position % 8;
        var byteToRead = Math.floor(position / 8);
        var bitsToRead = Math.min(bitsLeftToRead, 8 - bitToRead);
        // Read out the bits
        var r = ((buffer[byteToRead] >> bitToRead) & ((1 << bitsToRead) - 1));
        result.value += r << result.bitsRead;
        // Update counters
        result.bitsRead += bitsToRead;
        position += bitsToRead;
        bitsLeftToRead -= bitsToRead;
    }
    return result;
};
bitwriter.readInt = function (buffer, size, position) {
    var result = bitwriter.readUint(buffer, size, position);
    if (size < 32 && result.value >= (1 << (size - 1))) result.value -= 1 << size;
    return result;
};
bitwriter.readString = function (buffer, size, position) {
    var result = {value: [], bitsRead: 0};
    for (var i = 0; i < size; i++) {
        var readOut = bitwriter.readUint(buffer, 8, position + 8 * (size - i - 1));
        result.bitsRead += readOut.bitsRead;
        result.value.push(String.fromCharCode(readOut.value));
    }
    if (size > 1) {
        while (result.value[result.value.length - 1] === "\x00") {
            result.value.pop();
        }
    }
    result.value = result.value.join("");
    return result;
};
bitwriter.readFloat = function (buffer, size, position) {
    if (size === 32) {
        var buf = Buffer.alloc(4);
        buf[0] = bitwriter.readUint(buffer, 8, position).value;
        buf[1] = bitwriter.readUint(buffer, 8, position + 8).value;
        buf[2] = bitwriter.readUint(buffer, 8, position + 16).value;
        buf[3] = bitwriter.readUint(buffer, 8, position + 24).value;
        return {value: buf.readFloatLE(0), bitsRead: 32};
    } else {
        return {value: 0, bitsRead: size}; // TODO: Implement
    }
};