//http://scripts.cac.psu.edu/staff/r/j/rjg5/Math24.htm
//a few simple changes to suit class needs--v1 returns first solution only
//
//do24(document.forms[0].a.value,document.forms[0].b.value,document.forms[0].c.value,document.forms[0].d.value,document.forms[0].solutions)

var solutionsFound;
var solutionCount;
var solutionsReturned;
newSolution();
	
function newSolution() {
	solutionsFound = [];
	solutionCount = 0;
	solutionsReturned = -1;
}
	
function do24(a, b, c, d) {
	//test for valid input
	if ((isNaN(parseFloat(a)) && !a.match(/^\d+\/\d+$/)) ||
		(isNaN(parseFloat(b)) && !b.match(/\d+\/\d+/)) ||
		(isNaN(parseFloat(c)) && !c.match(/\d+\/\d+/)) ||
		(isNaN(parseFloat(d)) && !d.match(/\d+\/\d+/))) {
		return 'I need 4 numbers or simple fractions to work';
	}
	// define 2 local arrays, clear solution list, set max number of solutions, initialize # solutions found
	var nums = ["", a, b, c, d];
	var ops = ["", "+", "-", "*", "/"];
	var validSolution = "Working";
	var maxsol = 100;
	var sol = 0;
	
	
	if (solutionCount == 0) {
		// i,j,k,l are the indices for which number goes first, second, third and fourth
		for (i = 1; i < 5 && sol < maxsol; i++) {
			for (j = 1; j < 5 && sol < maxsol; j++) {
				if (j == i)
					continue
				for (k = 1; k < 5 && sol < maxsol; k++) {
					if (k == i | k == j) continue
					l = 1 + 2 + 3 + 4 - i - j - k
					// p,q and r indicate which operator goes between numbers
					for (p = 1; p < 5 && sol < maxsol; p++) {
						for (q = 1; q < 5 && sol < maxsol; q++) {
							for (r = 1; r < 5 && sol < maxsol; r++) {
								// grouping: (1234)
								for (p1o = 1; p1o < 4 && sol < maxsol; p1o++) {
									for (p1c = p1o + 1; p1c < 5 && sol < maxsol; p1c++) {
										for (ispecial = 1; ispecial <= 2; ispecial++) {
											// special case: (1 op 2) op (3 op 4) - the only case with 2 sets of parens
											if (ispecial == 1 && p1o == 1 && p1c == 2) {
												p2o = 3;
												p2c = 4
											} else {
												p2o = 0;
												p2c = 0
											}
											expr = p1o == 1 ? '(' : ''
											expr += nums[i] + ops[p] + (p1o == 2 ? '(' : '')
											expr += nums[j] + (p1c == 2 ? ')' : '')
											expr += ops[q] + (p1o == 3 || p2o == 3 ? '(' : '')
											expr += nums[k] + (p1c == 3 ? ')' : '')
											expr += ops[r] + nums[l] + (p1c == 4 || p2c == 4 ? ')' : '')
											//	solution.value += expr + ' = '
											ev = eval(expr)
											//	solution.value +=  ev +"\n"
											if (ev > 23.9999 && ev < 24.00001) {
												//only one solution required for our usage: RS
												/*if (sol == 0) solution.value = '';
												expr = expr + ' = ' + Math.round(ev);
												if (solution.value.indexOf(expr) < 0) {
													solution.value += expr + "\n";
													sol++
												}*/
												if (solutionsFound.indexOf(expr) == -1) {
													solutionsFound.push(expr);
												}
												sol++;
											} // end of ev=24
										} // next ispecial
									} // next p1c
								} // next p1o
							} // next  r
						} // next  q
					} // next  p
				} //next k
			} // next j
		} // next i
		
		solutionCount = solutionsFound.length;
	}
	
	var str;
	if (solutionCount == 0) {
		return false
	} else if (solutionsReturned == solutionCount) {
		solutionsReturned = 0;
		str = "Max solutions found. Starting over with first solution: " + solutionsFound[solutionsReturned];
		solutionsReturned++
		return str;
	} else {
		var str = solutionsFound[solutionsReturned] + " (" + (solutionsReturned+1) + " of " + (solutionCount) + ")";
		solutionsReturned++;
		return str;
	}
}