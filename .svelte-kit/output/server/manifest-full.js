export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "yannlemos/_app",
	assets: new Set(["icon_danca.svg","icon_musica.svg","icon_teatro.svg","logo.svg","padronagem_d.svg","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BG2Zi7o4.js",app:"_app/immutable/entry/app._VWe-Pdb.js",imports:["_app/immutable/entry/start.BG2Zi7o4.js","_app/immutable/chunks/gZ3QURHg.js","_app/immutable/chunks/DVFAed8y.js","_app/immutable/entry/app._VWe-Pdb.js","_app/immutable/chunks/DVFAed8y.js","_app/immutable/chunks/Dj6f-nJM.js","_app/immutable/chunks/DEDqjojZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
