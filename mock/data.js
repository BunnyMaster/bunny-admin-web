const data = {
	paths: {
		'/admin/user/uploadAvatarByAdmin': {
			put: {
				tags: ['用户信息'],
				summary: '修改用户头像',
				description: '管理员修改用户头像',
				operationId: 'uploadAvatarByAdmin',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/UserUpdateWithAvatarDto对象',
							},
						},
					},
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/updateUserStatusByAdmin': {
			put: {
				tags: ['用户信息'],
				summary: '修改用户状态',
				description: '管理员修改用户状态',
				operationId: 'updateUserStatusByAdmin',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/UserUpdateWithPasswordDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/updateUserPasswordByAdmin': {
			put: {
				tags: ['用户信息'],
				summary: '修改管理员用户密码',
				description: '管理员修改管理员用户密码',
				operationId: 'updateUserPasswordByAdmin',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/UserUpdateWithPasswordDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/updateAdminUser': {
			put: {
				tags: ['用户信息'],
				summary: '更新用户信息',
				description: '更新用户信息',
				operationId: 'updateAdminUser',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/AdminUserUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/forcedOffline': {
			put: {
				tags: ['用户信息'],
				summary: '强制退出',
				description: '强制退出',
				operationId: 'forcedOffline',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'integer',
								format: 'int64',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/updateMenu': {
			put: {
				tags: ['系统路由'],
				summary: '更新路由菜单',
				description: '更新路由菜单',
				operationId: 'updateMenu',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/RouterManageDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/role/updateRole': {
			put: {
				tags: ['角色'],
				summary: '更新角色',
				description: '更新角色',
				operationId: 'updateRole',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/RoleUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/power/updatePower': {
			put: {
				tags: ['权限'],
				summary: '更新权限',
				description: '更新权限',
				operationId: 'updatePower',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/PowerUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/menuIcon/updateMenuIcon': {
			put: {
				tags: ['系统菜单图标'],
				summary: '更新系统菜单图标',
				description: '更新系统菜单图标',
				operationId: 'updateMenuIcon',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/MenuIconUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18nType/updateI18nType': {
			put: {
				tags: ['多语言类型'],
				summary: '更新多语言类型',
				description: '更新多语言类型',
				operationId: 'updateI18nType',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/I18nTypeUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18n/updateI18n': {
			put: {
				tags: ['多语言'],
				summary: '更新多语言',
				description: '更新多语言',
				operationId: 'updateI18n',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/I18nUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/files/updateFiles': {
			put: {
				tags: ['系统文件表'],
				summary: '更新系统文件表',
				description: '更新系统文件表',
				operationId: 'updateFiles',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/FilesUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/dept/updateDept': {
			put: {
				tags: ['部门'],
				summary: '更新部门',
				description: '更新部门',
				operationId: 'updateDept',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/DeptUpdateDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/userRole/assignRolesToUsers': {
			post: {
				tags: ['用户和角色'],
				summary: '为用户分配角色',
				description: '为用户分配角色',
				operationId: 'assignRolesToUsers',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/AssignRolesToUsersDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/noAuth/sendLoginEmail': {
			post: {
				tags: ['用户信息'],
				summary: '登录发送邮件验证码',
				description: '登录发送邮件验证码',
				operationId: 'sendLoginEmail',
				parameters: [
					{
						name: 'email',
						in: 'query',
						required: true,
						schema: {
							type: 'string',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/noAuth/refreshToken': {
			post: {
				tags: ['用户信息'],
				summary: '刷新token',
				description: '刷新用户token',
				operationId: 'refreshToken',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/RefreshTokenDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultRefreshTokenVo 对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/logout': {
			post: {
				tags: ['用户信息'],
				summary: '退出登录',
				description: '退出登录',
				operationId: 'logout',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/addAdminUser': {
			post: {
				tags: ['用户信息'],
				summary: '添加用户信息',
				description: '添加用户信息',
				operationId: 'addAdminUser',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/AdminUserAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultObject',
								},
							},
						},
					},
				},
			},
		},
		'/admin/routerRole/assignRolesToRouter': {
			post: {
				tags: ['路由和角色'],
				summary: '为菜单分配角色',
				description: '为菜单分配角色',
				operationId: 'assignRolesToRouter',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/AssignRolesToRoutersDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/addMenu': {
			post: {
				tags: ['系统路由'],
				summary: '添加路由菜单',
				description: '添加路由菜单',
				operationId: 'addMenu',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/RouterManageDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/rolePower/assignPowersToRole': {
			post: {
				tags: ['角色和权限'],
				summary: '为角色分配权限',
				description: '为角色分配权限',
				operationId: 'assignPowersToRole',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/AssignPowersToRoleDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/role/addRole': {
			post: {
				tags: ['角色'],
				summary: '添加角色',
				description: '添加角色',
				operationId: 'addRole',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/RoleAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/power/addPower': {
			post: {
				tags: ['权限'],
				summary: '添加权限',
				description: '添加权限',
				operationId: 'addPower',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/PowerAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/menuIcon/addMenuIcon': {
			post: {
				tags: ['系统菜单图标'],
				summary: '添加系统菜单图标',
				description: '添加系统菜单图标',
				operationId: 'addMenuIcon',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/MenuIconAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18nType/addI18nType': {
			post: {
				tags: ['多语言类型'],
				summary: '添加多语言类型',
				description: '添加多语言类型',
				operationId: 'addI18nType',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/I18nTypeAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18n/addI18n': {
			post: {
				tags: ['多语言'],
				summary: '添加多语言',
				description: '添加多语言',
				operationId: 'addI18n',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/I18nAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/files/upload': {
			post: {
				tags: ['系统文件表'],
				summary: '上传文件',
				description: '上传文件',
				operationId: 'upload',
				parameters: [
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/FileUploadDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultFileInfoVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/files/addFiles': {
			post: {
				tags: ['系统文件表'],
				summary: '添加系统文件表',
				description: '添加系统文件表',
				operationId: 'addFiles',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/FilesAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/dept/addDept': {
			post: {
				tags: ['部门'],
				summary: '添加部门',
				description: '添加部门',
				operationId: 'addDept',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/DeptAddDto对象',
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/userRole/getRoleListByUserId': {
			get: {
				tags: ['用户和角色'],
				summary: '根据用户id获取角色列表',
				description: '根据用户id获取角色列表',
				operationId: 'getRoleListByUserId',
				parameters: [
					{
						name: 'userId',
						in: 'query',
						required: true,
						schema: {
							type: 'integer',
							format: 'int64',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/queryUser': {
			get: {
				tags: ['用户信息'],
				summary: '多条件查询用户',
				description: '多条件查询用户',
				operationId: 'queryUser',
				parameters: [
					{
						name: 'keyword',
						in: 'query',
						required: true,
						schema: {
							type: 'string',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListAdminUserVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/getUserinfoById': {
			get: {
				tags: ['用户信息'],
				summary: '获取用户信息',
				description: '获取用户信息',
				operationId: 'getUserinfoById',
				parameters: [
					{
						name: 'id',
						in: 'query',
						required: true,
						schema: {
							type: 'integer',
							format: 'int64',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultLoginVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/getAdminUserList/{page}/{limit}': {
			get: {
				tags: ['用户信息'],
				summary: '分页查询用户信息',
				description: '分页查询用户信息',
				operationId: 'getAdminUserList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/AdminUserAddDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象AdminUserVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/routerRole/getRoleListByRouterId': {
			get: {
				tags: ['路由和角色'],
				summary: '根据路由id获取所有角色',
				description: '根据路由id获取所有角色',
				operationId: 'getRoleListByRouterId',
				parameters: [
					{
						name: 'routerId',
						in: 'query',
						required: true,
						schema: {
							type: 'integer',
							format: 'int64',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/getRouterAsync': {
			get: {
				tags: ['系统路由'],
				summary: '获取用户菜单',
				description: '获取用户菜单',
				operationId: 'getRouterAsync',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListUserRouterVo',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/getMenusList': {
			get: {
				tags: ['系统路由'],
				summary: '管理菜单列表',
				description: '管理菜单列表',
				operationId: 'getMenusList',
				parameters: [
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/RouterManageDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListRouterManageVo',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/getMenusList/{page}/{limit}': {
			get: {
				tags: ['系统路由'],
				summary: '分页管理菜单列表',
				description: '分页管理菜单列表',
				operationId: 'getMenusByPage',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/RouterManageDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象RouterManageVo',
								},
							},
						},
					},
				},
			},
		},
		'/admin/rolePower/getPowerListByRoleId': {
			get: {
				tags: ['角色和权限'],
				summary: '根据角色id获取权限内容',
				description: '角色列表获取已选择的权限',
				operationId: 'getPowerListByRoleId',
				parameters: [
					{
						name: 'id',
						in: 'query',
						required: true,
						schema: {
							type: 'integer',
							format: 'int64',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/role/getRoleList/{page}/{limit}': {
			get: {
				tags: ['角色'],
				summary: '分页查询角色',
				description: '分页查询角色',
				operationId: 'getRoleList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/RoleDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象RoleVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/role/getAllRoles': {
			get: {
				tags: ['角色'],
				summary: '获取所有角色',
				description: '获取所有角色',
				operationId: 'getAllRoles',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListRoleVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/power/getPowerList/{page}/{limit}': {
			get: {
				tags: ['权限'],
				summary: '分页查询权限',
				description: '分页查询权限',
				operationId: 'getPowerList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/PowerDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象PowerVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/power/getAllPowers': {
			get: {
				tags: ['权限'],
				summary: '获取所有权限',
				description: '获取所有权限',
				operationId: 'getAllPowers',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListPowerVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/menuIcon/getMenuIconList/{page}/{limit}': {
			get: {
				tags: ['系统菜单图标'],
				summary: '分页查询系统菜单图标',
				description: '分页查询系统菜单图标',
				operationId: 'getMenuIconList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/MenuIconDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象MenuIconVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/menuIcon/getIconNameList': {
			get: {
				tags: ['系统菜单图标'],
				summary: '获取查询图标名称列表',
				description: '获取查询图标名称列表',
				operationId: 'getIconNameList',
				parameters: [
					{
						name: 'iconName',
						in: 'query',
						required: true,
						schema: {
							type: 'string',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListMenuIconVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18nType/getI18nTypeList': {
			get: {
				tags: ['多语言类型'],
				summary: '获取多语言类型',
				description: '获取多语言类型',
				operationId: 'getI18nTypeList',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListI18nVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18n/getI18n': {
			get: {
				tags: ['多语言'],
				summary: '获取多语言内容',
				description: '获取多语言内容',
				operationId: 'getI18n',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultMapStringObject',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18n/getI18nList/{page}/{limit}': {
			get: {
				tags: ['多语言'],
				summary: '获取管理多语言列表',
				description: '获取管理多语言列表',
				operationId: 'getI18nList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/I18nDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象I18nVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/files/getFilesList/{page}/{limit}': {
			get: {
				tags: ['系统文件表'],
				summary: '分页查询系统文件表',
				description: '分页查询系统文件表',
				operationId: 'getFilesList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/FilesDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象FilesVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/dept/getDeptList/{page}/{limit}': {
			get: {
				tags: ['部门'],
				summary: '分页查询部门',
				description: '分页查询部门',
				operationId: 'getDeptList',
				parameters: [
					{
						name: 'page',
						in: 'path',
						description: '当前页',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'limit',
						in: 'path',
						description: '每页记录数',
						required: true,
						schema: {
							type: 'integer',
							format: 'int32',
						},
					},
					{
						name: 'dto',
						in: 'query',
						required: true,
						schema: {
							$ref: '#/components/schemas/DeptDto对象',
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultPageResult 对象DeptVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/dept/getAllDeptList': {
			get: {
				tags: ['部门'],
				summary: '获取所有部门',
				description: '获取所有部门',
				operationId: 'getAllDeptList',
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultListDeptVo对象',
								},
							},
						},
					},
				},
			},
		},
		'/admin/user/deleteAdminUser': {
			delete: {
				tags: ['用户信息'],
				summary: '删除用户信息',
				description: '删除用户信息',
				operationId: 'deleteAdminUser',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/router/deletedMenuByIds': {
			delete: {
				tags: ['系统路由'],
				summary: '删除路由菜单',
				description: '删除路由菜单',
				operationId: 'deletedMenuByIds',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/role/deleteRole': {
			delete: {
				tags: ['角色'],
				summary: '删除角色',
				description: '删除角色',
				operationId: 'deleteRole',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/power/deletePower': {
			delete: {
				tags: ['权限'],
				summary: '删除权限',
				description: '删除权限',
				operationId: 'deletePower',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/menuIcon/deleteMenuIcon': {
			delete: {
				tags: ['系统菜单图标'],
				summary: '删除系统菜单图标',
				description: '删除系统菜单图标',
				operationId: 'deleteMenuIcon',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18nType/deleteI18nType': {
			delete: {
				tags: ['多语言类型'],
				summary: '删除多语言类型',
				description: '删除多语言类型',
				operationId: 'deleteI18nType',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/i18n/deleteI18n': {
			delete: {
				tags: ['多语言'],
				summary: '删除多语言类型',
				description: '删除多语言类型',
				operationId: 'deleteI18n',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/files/deleteFiles': {
			delete: {
				tags: ['系统文件表'],
				summary: '删除系统文件表',
				description: '删除系统文件表',
				operationId: 'deleteFiles',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
		'/admin/dept/deleteDept': {
			delete: {
				tags: ['部门'],
				summary: '删除部门',
				description: '删除部门',
				operationId: 'deleteDept',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'integer',
									format: 'int64',
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'*/*': {
								schema: {
									$ref: '#/components/schemas/ResultString',
								},
							},
						},
					},
				},
			},
		},
	},
};

// 获取所有键
Object.keys(data.paths)
	.filter(item => !item.includes('noAuth'))
	.forEach(key => {
		Object.entries(data.paths[key]).forEach(async ([_, { summary }]) => {
			const item = {
				parentId: 0,
				powerCode: key.replace('/{page}/{limit}', '').replace('/{id}', '').replace('/', '').replaceAll('/', '::'),
				powerName: summary,
				requestUrl: key.replace('{page}', '\\d+').replace('{limit}', '\\d+').replace('/{id}', '\\d+'),
			};
			const response = await fetch('http://localhost:7070/admin/power/addPower', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token:
						'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_yWLQQrCMBBF7zLrRjLTxDhdSXduvIOpf0Ch1bYGKuLdDbj7vPf-h9aSqaO-TNObGsL2pI6THDSKV2morFhO18r-83wZUXNuWdV7juE4z7vhMdbr_XWrJpmXAcZOg-5dAMxlRLg2IRtMIpjp-wPL7wZTdwAAAA.rNvGDARzXUVHTosLybe9L-pOF6w4p6VsUt-kRCw8ijk',
				},
				body: JSON.stringify(item),
			});
			const json = await response.json();
			console.log(json);
		});
	});
