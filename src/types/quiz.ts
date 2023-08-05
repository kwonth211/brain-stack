export interface Quiz {
	id: number;
	category_id: number;
	question: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	answer: number;
	explanation: string;
	difficulty: 'Easy' | 'Medium' | 'Hard';
}
