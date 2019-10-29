export class Utils {
	public static shuffle<T>(originalArray: Array<T>): Array<T> {
		const subjectArray: Array<T> = [...originalArray];
		for (let index = subjectArray.length; index > 0; index--) {
			let randIndex = Math.floor(Math.random() * index);
			let tmpVal = subjectArray[index - 1];
			subjectArray[index - 1] = subjectArray[randIndex];
			subjectArray[randIndex] = tmpVal;
		}
		return subjectArray
	}
}