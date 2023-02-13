import Card from './Card';

const Cards = ({ data, name: search }) => {
	if (search) {
		let newData = data.filter((item) => {
			let { name } = item;
			name = name.toLowerCase();

			return name.startsWith(search.toLowerCase());
		});
		data = newData;
	}

	if (search && data.length === 0) {
		return <h3 className="noItems">No items found</h3>;
	}

	return (
		<div className="cards">
			{data.map((card) => {
				const { id } = card;

				return <Card key={id} {...card} search={search} />;
			})}
		</div>
	);
};

export default Cards;
