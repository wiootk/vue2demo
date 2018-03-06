	import 'babel-polyfill'
	// load 所有的测试用例文件	　　
	const testsContext = require.context('./', true, /\.spec$/);　　
	testsContext.keys().forEach(testsContext);　　
	// load 资源文件，及src目录下的除了main.js文件的所有文件	　　　
	const srcContext = require.context('../../src', true, /^\.\/(?!(main|index)(\.js)?$)/);　
	srcContext.keys().forEach(srcContext);