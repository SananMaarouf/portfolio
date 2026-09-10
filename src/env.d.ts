/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly PUBLIC_PAGE_TITLE: string;
	readonly PUBLIC_NAVBAR_TITLE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
