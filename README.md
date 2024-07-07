Simple WebUI for managing Appcats. This project is an effect of boredom during rainy weekend. Probably will be continued in the future.

Setup kind cluster:
1. Install kind
2. Clone kindev repository: `git clone https://github.com/vshn/kindev.git`
3. Run from kindev directory: `make clean && make vshnpostgresql vshnredis minio prometheus-setup komoplane-setup`
4. Copy kubeconfig file to the restapi directory, You can find it in kindev directory in .kind/kind-kubeconfig-v1.26.6 or something like that
5. Clone component-appcat directory: `git clone https://github.com/vshn/component-appcat.git` and run `k apply -R -f component/tests/golden/vshn/appcat/appcat` to deploy Appcats - give it a moment and then rerun command to check if everything is up and running
6. Create some appcats, based on https://docs.appcat.ch/vshn-managed/postgresql/create.html pick up those named "On Cloudscale"

How to setup WebUI:
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the app: `npm start`
4. Open the browser and go to `http://localhost:3000`
5. In separate Terminal go to the restapi directory and run the REST API: `go run main.go` (you need to have Go installed), api assumes You to provide kubeconfig file to the same direcotry as restapi/main.go file

