/**
 * * 自动创建权限内容
 */
(async function requestPath() {
	// 获取基础paths对象
	const response = await fetch('http://localhost:7070/v3/api-docs/admin%E7%AE%A1%E7%90%86%E5%91%98%E6%8E%A5%E5%8F%A3%E8%AF%B7%E6%B1%82', { method: 'GET' });
	const json = await response.json();
	const paths = json.paths;

	// 设置父级id顺序
	let id = 1;

	// 最后整理的数据内容
	const data = {};

	// 获取所有键
	Object.keys(paths)
		.filter(item => !item.includes('noAuth'))
		.forEach(key => {
			const pathKey = paths[key];
			const { tags, description } = pathKey[Object.keys(pathKey)[0]];
			const tag = tags[0];

			// 父级内容为info信息
			const path = key.match(/\w+\/\w+/, key)[0];
			const info = {
				id: 1,
				parentId: 0,
				powerCode: path.replaceAll('/', '::'),
				powerName: tag,
				requestUrl: undefined,
			};

			// 整理子级内容信息
			const powerCode = key.replace('/admin/', '').replace(/\/\{.*?\}/g, '');
			const item = {
				parentId: info.id,
				powerCode: powerCode.replaceAll('/', '::'),
				powerName: description,
				requestUrl: key.replace(/\/{.*/, '/.*'),
			};

			// 向父级内容添加子级Children内容
			if (!data[tag]) {
				data[tag] = {
					info,
					children: [item],
				};
			}
			data[tag].children.push(item);
		});

	// 便利整理好的参数data
	for (const item in data) {
		// 先添加父级内容
		const info = data[item].info;
		info.id = id;
		await add(info);

		// 遍历子级内容向服务器添加
		const children = data[item].children;
		for (const item1 of children) {
			item1.parentId = id;
			await add(item1);
		}

		// 父级添加后id增加
		id++;
	}
})();

// 向服务器添加的内容
async function add(data) {
	const response = await fetch('http://localhost:7070/admin/power/addPower', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			token:
				'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_yWLywrCMBAA_2XPjeSxZEtP4s2L_7DpbqBCorUGLMV_N-BtGGYO2FqCCS6t1h0G0M8TJkfBhtFbHwdom76u0t0fb1y05yxlqed1Pc2P0q_7e-lS3JwUkQxhDgZzFMPZkUmWhTX6EYnh-wMBQi1DcgAAAA.II3lcc1R1pX8G6eaEVkCxxDXkscN4c6p89zn7FzFhaU',
		},
		body: JSON.stringify(data),
	});
	const json = await response.json();
	console.log(json);
}
