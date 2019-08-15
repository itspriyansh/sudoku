function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    let board=[], query=[], h=[], v=[], b=[], c=[];
    for(let i=0;i<9;i++){
        h.push(new Set());
        v.push(new Set());
        b.push(new Set());
    }
    for(let i=0;i<81;i++){
        c.push(new Set());
        board.push(document.getElementById(i).value);
        if(board[i]==""){
            query.push(i);
        }else{
            board[i]-='0';
            let x = board[i], p=Math.floor(i/9), q=i%9;
            if(h[p].has(x) || v[q].has(x) || b[Math.floor(p/3)*3+Math.floor(q/3)].has(x)){
                document.getElementById('warning').textContent = "Invalid Values Entered at "+(p+1)+", "+(q+1);
                return false;
            }else{
                h[p].add(x);
                v[q].add(x);
                b[Math.floor(p/3)*3+Math.floor(q/3)].add(x)
            }
        }
    }
    let pos=0;
    while(pos<query.length){
        let p=Math.floor(query[pos]/9), q=query[pos]%9, found=false;
        for(let i=1;i<=9;i++){
            if(!h[p].has(i) && !v[q].has(i) && !b[Math.floor(p/3)*3+Math.floor(q/3)].has(i) && !c[query[pos]].has(i)){
                found=true;
                h[p].add(i);v[q].add(i);b[Math.floor(p/3)*3+Math.floor(q/3)].add(i);
                board[p*9+q]=i;
                for(let j=pos+1;j<query.length;j++){
                    if(c[query[j]].size==0) break;
                    c[query[j]].clear();
                }
                break;
            }
        }
        if(found){
            pos++;
            continue;
        }
        if(!pos){
            document.getElementById('warning').textContent = "Unable to Solve";
            return false;
        }
        p=Math.floor(query[--pos]/9);
        q=query[pos]%9;
        c[query[pos]].add(board[p*9+q]);
        h[p].delete(board[p*9+q]);
        v[q].delete(board[p*9+q]);
        b[Math.floor(p/3)*3+Math.floor(q/3)].delete(board[p*9+q]);
        board[p*9+q] = "";
    }
    for(let i=0;i<81;i++){
        if(document.getElementById(i).value==""){
            document.getElementById(i).value = board[i];
            document.getElementById(i).style.color = 'red';
        }else{
            document.getElementById(i).style.color = 'black';
        }
    }
    return false;
}

function resetForm(e){
    if (e.preventDefault) e.preventDefault();
    for(let i=0;i<81;i++){
        document.getElementById(i).value="";
        document.getElementById(i).style.color='black';
    }
}

var submit = document.getElementById('submit');
if (submit.attachEvent) {
    submit.attachEvent("click", processForm);
} else {
    submit.addEventListener("click", processForm);
}

var reset = document.getElementById('reset');
if (reset.attachEvent) {
    reset.attachEvent("click", resetForm);
} else {
    reset.addEventListener("click", resetForm);
}