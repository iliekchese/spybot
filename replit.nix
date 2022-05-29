{ pkgs }: {
	deps = with pkgs; [
		nodejs-17_x
		nodePackages.typescript-language-server
	];
}