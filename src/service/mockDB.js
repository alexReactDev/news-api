import db from "../model/db.js";
import _ from "lodash";

const authors = ["Joe Biden", "Andrew Goodman", "Johny Depp", "Bill Gates", "John Doe"];
const femaleAuthors = ["Bloody Mary", "Anna Abbot", "Mary Jane"];
const users = ["July Linn", "Anna", "Mary Willow", "Dill Harris", "Alex Zero", "Pole Sartr", "Fedor Dostoevsky", "Pedro"];
const words = `Results of phylogenetic research 
confirm that the wild Felis species evolved through 
sympatric or parapatric speciation, whereas the domestic 
cat evolved through artificial selection. The 
domesticated cat and its closest wild ancestor are 
diploid and both possess 38 chromosomes and roughly 
20,000 genes.The leopard cat (Prionailurus bengalensis) 
was tamed independently in China around 5500 BC. This 
line of partially domesticated cats leaves no trace in 
the domestic cat populations of today`.split(" ");
const texts = [`Lingua Latina temporibus Neolatinis plura Europae regna non utuntur, nisi in rebus Ecclesiae 
operibusque scientiae. In Imperio Romano Sacro Italiaeque regionibus iam a saeculo decimo quinto 
nobiles competentesque ad gubernandum non Latine, sed suae civitatis idiomate, scilicet Theodisce et 
Italiane his in casibus loquuntur. Hungaria, quae minor in regnis Europae erat, usque ad 1844 
multarum civitatum regni eiusque conservativismi causa in legislatione in diaetis Latino sermone 
utebantur. Thesaurus Latinitatis Hungaricae etiam in eo demonstratur, quod regni historiae paene 
tota legenda gestaque, ephemerides, varii libri scientiae etc. in hoc sermone scripta sunt. Inito 
nationalismo multi fuerunt, qui pro Hungarorum sermone multum laboraverunt, sineque ulla animadversione 
variarum aliarum gentium, qui etiam in regno Hungarico vivebant hi linguarum cultores officium Hungarice 
discendi ad cunctas scholas amplificaverant; disputata igitur erat quaestio linguae civitatis 50 annos, 
a finibus saeculi duodevicensimi usque ad 1844. Contra totam solum Croati adversabantur: Croati nobiles 
decreverunt in diaeta provinciali anno 1805 25 Novembris, ut "nullo tempore linguae Hungaricae, aut 
alterius, praeter Latinam in his regnis usus fiat.`, 
`Gumbo beet greens corn soko endive gumbo gourd. 
Parsley shallot courgette tatsoi pea sprouts fava bean
collard greens dandelion okra wakame tomato. Dandelion
cucumber earthnut pea peanut soko zucchini.`,
`Fish are aquatic, craniate, gill-bearing animals that 
lack limbs with digits. Included in this definition are 
the living hagfish, lampreys, and cartilaginous and bony 
fish as well as various extinct related groups. 
Approximately 95% of living fish species are ray-finned 
fish, belonging to the class Actinopterygii, with around 
99% of those being teleosts. `];
const comments = [`Actinopterygii, with around 
99% of those being teleosts.`, `Gumbo beet greens corn soko endive gumbo gourd. 
Parsley shallot courgette tatsoi pea sprouts fava bean
collard greens dandelion okra wakame tomato.`, `Hungarico vivebant hi linguarum cultores officium Hungarice 
discendi ad cunctas scholas amplificaverant; disputata igitur erat quaestio linguae civitatis 50 annos, 
a finibus saeculi duodevicensimi usque ad 1844.`];
const towns = ["New York", "San Francisco", "Mexico", "Springtown", "Jakarta", "Boston"];

export default class MockDB {
	async createCategories() {
		const categories = [
			{
				name: "Cats",
				url: "cats"
			},
			{
				name: "Dogs",
				url: "dogs"
			},
			{
				name: "World news",
				url: "news"
			}
		];

		for (let cat of categories) {
			await db.query(`INSERT INTO categories (name, url) values($1, $2)`, [cat.name, cat.url]);
		}
	}

	async createPosts(postsPerCategory = 10) {
		const categories = (await db.query(`SELECT * FROM categories;`)).rows;
		const authors = (await db.query(`SELECT * FROM authors;`)).rows;

		for(let cat of categories) {
			for (let i = 0; i <= postsPerCategory; i++) {
				const title = words[_.random(words.length - 1)] + (_.random(2) ? " " + words[_.random(words.length - 1)] : "");
				const text = texts[_.random(texts.length - 1)];
				const created = new Date().getTime() - (_.random(31556926000));
				const author = authors[_.random(authors.length - 1)].id;
				await db.query(`INSERT INTO posts (title, text, created, author, category) values($1, $2, $3, $4, $5)`, [title, text, created, author, cat.id]);
			}
		}
	}

	async createComments(commentsPerPost = 5) {
		const posts = (await db.query(`SELECT * FROM posts;`)).rows;

		for(let post of posts) {
			for(let i = 0; i <= commentsPerPost; i++) {
				const author = users[_.random(users.length - 1)];
				const text = comments[_.random(comments.length - 1)];
				const created = new Date().getTime() - (_.random(31556926000));
				await db.query(`INSERT INTO comments (author, text, created, post_id) values($1, $2, $3, $4)`, [author, text, created, post.id]);
			}
		}
	}

	async createReactions() {
		const posts = (await db.query(`SELECT * FROM posts;`)).rows;

		for(let post of posts) {
			const likes = _.random(999);
			const dislikes = _.random(999);
			await db.query(`INSERT INTO reactions (likes, dislikes, post_id) values($1, $2, $3);`, [likes, dislikes, post.id]);
		}
	}

	async createAuthors() {
		for(let i = 0; i < authors.length; i++) {
			const name = authors[i];
			const age = _.random(65);
			const gender = "male";
			const city = towns[_.random(towns.length - 1)];
			const about = texts[_.random(texts.length - 1)];
			const picture = `pictures/profile/male/${_.random(7)}.jpg`;

			await db.query(`INSERT INTO authors (name, age, gender, city, about, picture) values($1, $2, $3, $4, $5, $6);`, [name, age, gender, city, about, picture]);
		}
		for(let i = 0; i < femaleAuthors.length; i++) {
			const name = femaleAuthors[i];
			const age = _.random(65);
			const gender = "female";
			const city = towns[_.random(towns.length - 1)];
			const about = texts[_.random(texts.length - 1)];
			const picture = `pictures/profile/female/${_.random(7)}.jpg`;
			await db.query(`INSERT INTO authors (name, age, gender, city, about, picture) values($1, $2, $3, $4, $5, $6);`, [name, age, gender, city, about, picture]);
		}
	}
}