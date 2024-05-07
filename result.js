let urlParams = new URLSearchParams(window.location.search);
const choice = urlParams.get('choice');
const career = ['doctor', 'science', 'finance', 'lawyer', 'artist'];

const careers = [
	(doctor = [
		'Health and Medicine',
		'This career profession involves healthcare services that provide care for people. They are an essential part of our society. This professional field often requires specialized training and certification.',
	]),
	(science = [
		'Science and Technology ',
		'Science and technology is a diverse career field that generally involves scientific research and the development of innovative technologies that benefit humanity.Scientific professions often involved some degree of mathematics or computer science knowledge.',
	]),
	(finance = [
		'Business Management and Administration',
		'The business, management and administration career fields are best for business-minded individuals with a penchant for communication. They work to execute various processes necessary for the functioning of businesses. It usually involves working in an office environment.',
	]),
	(lawyer = [
		'Law and Public Policy',
		'Within the law and public policy field, occupations include criminal justice, public policy advocacy and political lobbying. This career field comprises all the employment sectors. You can find a job working for the government, nonprofits, think tanks and large for-profit companies.',
	]),
	(artist = [
		'Arts, Culture and Entertainment',
		"This career field is dedicated to enriching people's lives through culture and the sharing of arts and self-expression. There are formal educational programs for these fields, but these careers also include self-taught people who have natural talent",
	]),
];

document.querySelector('.heading--result').textContent = careers[choice][0];
document.querySelector('.result-description').textContent = careers[choice][1];
document.querySelector('.career-img').src = `./images/${career[choice]}.svg`;
