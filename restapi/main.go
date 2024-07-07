package main

import (
	"context"
	"encoding/json"
	"strings"

	"github.com/gin-gonic/gin"
	vshnv1 "github.com/vshn/appcat/v4/apis/vshn/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

func main() {
	config, err := clientcmd.BuildConfigFromFlags("", "./kubeconfig")
	if err != nil {
		panic(err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	// Disable cors
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.Header("Allow", "GET, OPTIONS")
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/vshnpostgresql", func(c *gin.Context) {
		c.JSONP(200, getAppcat(clientset, "vshnpostgresqls", vshnv1.VSHNPostgreSQLList{}))
	})
	r.GET("/vshnmariadb", func(c *gin.Context) {
		c.JSONP(200, getAppcat(clientset, "vshnmariadbs", vshnv1.VSHNMariaDBList{}))
	})
	r.GET("/vshnkeycloak", func(c *gin.Context) {
		c.JSONP(200, getAppcat(clientset, "vshnkeycloaks", vshnv1.VSHNKeycloakList{}))
	})
	r.GET("/vshnredis", func(c *gin.Context) {
		c.JSONP(200, getAppcat(clientset, "vshnredis", vshnv1.VSHNRedisList{}))
	})
	r.GET("/vshnminio", func(c *gin.Context) {
		c.JSONP(200, getAppcat(clientset, "vshnminio", vshnv1.VSHNMinioList{}))
	})
	r.Run() // listen and serve on
}

func getAppcat(clientset *kubernetes.Clientset, serviceNamePlural string, appcat interface{}) interface{} {

	data, err := clientset.RESTClient().Get().AbsPath("/apis/vshn.appcat.vshn.io/v1/x" + strings.ToLower(serviceNamePlural)).DoRaw(context.Background())
	if err != nil {
		panic(err)
	}

	switch appcat.(type) {
	case vshnv1.VSHNPostgreSQLList:
		toRet := vshnv1.VSHNPostgreSQLList{}

		if err := json.Unmarshal(data, &toRet); err != nil {
			panic(err)
		}

		return toRet
	case vshnv1.VSHNMariaDBList:
		toRet := vshnv1.VSHNMariaDBList{}

		if err := json.Unmarshal(data, &toRet); err != nil {
			panic(err)
		}

		return toRet
	case vshnv1.VSHNKeycloakList:
		toRet := vshnv1.VSHNKeycloakList{}

		if err := json.Unmarshal(data, &toRet); err != nil {
			panic(err)
		}

		return toRet
	case vshnv1.VSHNRedisList:
		toRet := vshnv1.VSHNRedisList{}

		if err := json.Unmarshal(data, &toRet); err != nil {
			panic(err)
		}

		return toRet
	case vshnv1.VSHNMinioList:
		toRet := vshnv1.VSHNMinioList{}

		if err := json.Unmarshal(data, &toRet); err != nil {
			panic(err)
		}

		return toRet

	}

	return nil
}
