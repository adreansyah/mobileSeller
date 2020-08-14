const message = (rule) => {
    return {
        'required': ['Required'],
        'email': ['Invalid email address'],
        'length': ['The length must be ' + rule + ' characters'],
        'minLength': ['Minimum ' + rule + ' characters required'],
        'maxLength': ['Maximum ' + rule + ' characters allowed'],
        'minValue': ['Minimum value is ' + rule],
        'maxValue': ['Maximum value is ' + rule],
        'equals': ['Fields do not match'],
        'matches': ['Incorrect field'],
        'phone': ['Invalid phone number'],
        'letterNumber': ['Only letters and numbers allowed'],
        'letterNumberSp': ['Only letters, numbers and spaces allowed'],
        'decimal': ['Only decimal (3 digits behind the comma)'],
        'number': ['Only numbers'],
        'numberSp': ['Only numbers and spaces allowed'],
        'letter': ['Only letters'],
        'letterSp': ['Only letters and spaces allowed'],
        'npwp': ['Incorrect npwp format'],
        'passwordFormat': ['Please enter a password with 6-32 characters', 'Use a combination of letters & numbers'],
        'fileSize': ['File size too large'],
        'fileType': ['Incorrect file type']
    }
}

export default message;